import React,{useState,useEffect} from 'react'
import Pagination from '../../Widgets/Pagination'
const Table = ({data,colClass,columns}) => {
  const [posts, setPosts] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  useEffect(() => {
    setPosts(data)
  }, [data])
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <div>
            <table className="table table-striped border-0">
                <thead>
                    <tr>
                        {columns.map((item,key) => {
                            return(
                                <th scope="col" key={key} className={`text-muted px-3 ${colClass}`}>
                                    {item}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.map((item,key) => {
                        return(
                            <tr key={key}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.location}</td>
                                <td>{item.phone_no}</td>
                                {item.action?
                                  <td>{item.action}</td>
                                :null}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
            />
        </div>
    )
}
export default Table