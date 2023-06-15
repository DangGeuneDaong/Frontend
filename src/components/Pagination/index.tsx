import * as S from './styles'

interface OfferPageProps {
  total: number,
  limit: number,
  page: number,
  setPage: (setPage: number) => void,
}


function Pagination({ total, limit, page, setPage }: OfferPageProps) {
  const numPages = Math.ceil(total / limit);
  console.log('numPages :', numPages)

  // const pageButtons = Array.from({ length: numPages }, (v, i) => i).map((item, index) => (
  //   <button
  //     key={index + 1}
  //     onClick={() => setPage(index + 1)}
  //   // aria-current={page === index + 1 ? 'page' : null}
  //   >{index + 1}</button>
  // ));

  return (
    <>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>&lt;</button>

      {/* {pageButtons} */}
      {Array(numPages).fill(0).map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPage(index + 1)}
          aria-current={page === index + 1 && 'page'}
        >{index + 1}</button>
        // console.log('index :', index)
      ))}

      <button onClick={() => setPage(page + 1)} disabled={page === numPages}>&gt;</button>
    </>
  )
}

export default Pagination