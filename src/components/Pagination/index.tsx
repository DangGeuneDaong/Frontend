import * as S from './styles'

interface OfferPageProps {
  total: number,
  limit: number,
  page: number,
  setPage: (setPage: number) => void,
}


function Pagination({ total, limit, page, setPage }: OfferPageProps) {
  const numPages = Math.ceil(total / limit);

  return (
    <S.Container>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>&lt;</button>

      {Array(numPages).fill(0).map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPage(index + 1)}
          aria-current={page === index + 1 ? 'page' : undefined}
        >{index + 1}</button>
      ))}

      <button onClick={() => setPage(page + 1)} disabled={page === numPages}>&gt;</button>
    </S.Container>
  )
}

export default Pagination
