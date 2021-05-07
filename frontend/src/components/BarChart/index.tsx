import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSuccess } from 'types/sale';
import { round } from 'utils/formart';
import { BASE_URL } from 'utils/requests';

type SeriesData = {
    name: string;
    data: number[];
}

type ChartData = {
    labels: {
        categories: string[];
    };
    series: SeriesData[]
}

function BarChart() {
    const [chartData, setChartData] = useState<ChartData>({
            labels: {
            categories: []
        },
        series: [
            {
                name: "",
                data: []                   
            }
        ]
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/success-by-seller`)
            .then(response => {
                const data = response.data as SaleSuccess[];
                const labels = data.map(sale => sale.sellerName);
                const series = data.map(sale => round(100*(sale.deals / sale.visited), 1));

                setChartData({
                    labels: {
                    categories: labels
                },
                series: [
                    {
                        name: "Success rate (%)",
                        data: series                   
                    }
                ]
            });
        });
    }, []);

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };
    
    return (
        <Chart
            options={ {...options, xaxis: chartData.labels} }
            series={chartData.series}
            type="bar"
            height="240"
        />
    );
}

export default BarChart;