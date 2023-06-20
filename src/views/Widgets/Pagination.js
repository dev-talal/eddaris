import React,{useState} from 'react';
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const [active,setActive] = useState(1)
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const setPaginate = (number) => {
    paginate(number)
    setActive(number)
  }
  return (
    <nav className="mt-5">
      <ul className='pagination ms-auto w-fit-content'>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${active==number?"active":""}`}>
            <a onClick={() => setPaginate(number)} className={`page-link cursor-pointer text-decoration-none`}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
