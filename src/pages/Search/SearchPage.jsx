import styles from "./Search.module.css";

//hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

//components
import PostDetailComponent from "../../components/PostDetailComponent";

import { Link } from "react-router-dom";

const SearchPage = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);
  console.log(posts);

  return (
    <div className={styles.search_container}>
      <h2>Resultados para a busca:</h2>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Nenhuma viagem encontrada a partir da sua busca...</p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </div>
        )}
        {posts && posts.map((post) => (
            <PostDetailComponent key={post.id} post={post} />
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
