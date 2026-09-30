import ReactPaginate from "react-paginate";

export default function TestPagination() {
    return (
        <div>
            <h1>Test</h1>

            <ReactPaginate
                pageCount={3}
                onPageChange={({ selected }) => {
                    console.log("selected:", selected);
                }}
                previousLabel="Previous"
                nextLabel="Next"
            />
        </div>
    );
}