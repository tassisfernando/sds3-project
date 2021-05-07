import axios from "axios";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { SalePage } from "types/sale";
import { formatLocalDate } from "utils/formart";
import { BASE_URL } from "utils/requests";

function DataTable() {
    const [page, setPage] = useState<SalePage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });

    const [activePage, setActivePage] = useState(0);

    useEffect(() => {
        axios.get(`${BASE_URL}/sales?page=${activePage}&size=10&sort=date,desc`)
            .then(response => {
                setPage(response.data);
            });
    }, [activePage]);

    const changePage = (index: number) => {
        setActivePage(index);
    }

    return (
        <>
            <div className="table-responsive">
                <table className="table table-striped table-sm text-center">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Seller</th>
                            <th>Customers visited</th>
                            <th>Closed deals</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            page.content?.map(sale => (
                            <tr key={sale.id}>
                                <td>{formatLocalDate(sale.date, 'dd/MM/yyyy')}</td>
                                <td>{sale.seller.name}</td>
                                <td>{sale.visited}</td>
                                <td>{sale.deals}</td>
                                <td>{sale.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination page={page} onPageChange={changePage} />
        </>
    );
}

export default DataTable;