import { useQuery } from "@apollo/client";
import TableList from "../components/TableList";
import { useEffect, useState } from "react";
import { RepositoryType } from "../types";
import { SpinnerIcon } from "../components/icons";
import { GET_REACT_REPOSITORIES } from "../queries/RepositoriesQuery";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import "../styles/global.css";

type ResponseType = RepositoryType & {
  primaryLanguage: {
    name: string;
  };
};

type PaginationProps = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  labels: number[];
};

type QueryProps = {
  search: {
    nodes: ResponseType[];
    repositoryCount: number;
    pageInfo: PaginationProps & {
      startCursor: string;
      endCursor: string;
    };
  };
};

const ITEMS_PER_PAGE = 15;
const PAGINATION_BUTTONS_LENGTH = 5;

function App() {
  const [repositories, setRepositories] = useState<RepositoryType[]>([]);
  const [pagination, setPagination] = useState<PaginationProps | null>();
  const [startCursor, setStartCursor] = useState<string | null>(null);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [paginationLabels, setPaginationLabels] = useState([1, 2, 3, 4, 5]);

  const { data, loading, error, refetch } = useQuery<QueryProps>(
    GET_REACT_REPOSITORIES,
    {
      variables: {
        first: ITEMS_PER_PAGE,
        last: null,
        after: null,
        before: null,
        querystring: "topic:python sort:updated-asc",
      },
    }
  );

  useEffect(() => {
    setPageLoading(loading);
    if (!loading && !error) {
      const repos: RepositoryType[] = data!.search.nodes.map((repo) => ({
        id: repo.id,
        name: repo.name,
        stargazerCount: repo.stargazerCount,
        forkCount: repo.forkCount,
        url: repo.url,
      }));

      setRepositories(repos);
      setPagination({
        hasNextPage: data!.search.pageInfo.hasNextPage,
        hasPreviousPage: data!.search.pageInfo.hasPreviousPage,
        page: 1,
        labels: paginationLabels,
      });
      setStartCursor(data!.search.pageInfo.startCursor);
      setEndCursor(data!.search.pageInfo.endCursor);
      setPageLoading(loading);
    }
  }, [data, loading, error]);

  if (error) {
    return <p>Error {error.message}</p>;
  }

  function handleSearch(term: string) {
    setPageLoading(true);
    refetch({
      querystring: term,
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPageLoading(false);
      });
  }

  async function handlePageClick(id: number) {
    setPageLoading(true);
    let refetchObject: {
      after: string | null;
      before: string | null;
      first: number | null;
      last: number | null;
    } = { after: null, before: null, first: 5, last: null };
    let page = pagination!.page;

    if (id === 0) {
      // next page
      refetchObject = {
        first: ITEMS_PER_PAGE,
        last: null,
        after: endCursor,
        before: null,
      };
      page = pagination!.page + 1;
    } else if (id === -1) {
      // previous page
      refetchObject = {
        first: null,
        last: ITEMS_PER_PAGE,
        after: null,
        before: startCursor,
      };
      page = pagination!.page - 1;
    } else {
      const offsetStartCursor = `cursor:${ITEMS_PER_PAGE * (id - 1)}`;
      const encodedStartCursor = btoa(String(offsetStartCursor));
      refetchObject = {
        first: ITEMS_PER_PAGE,
        last: null,
        after: encodedStartCursor,
        before: null,
      };
      page = id;
    }

    refetch({
      ...refetchObject,
    })
      .then((res) => {
        let pagLabels = paginationLabels.slice();

        if (page > paginationLabels[paginationLabels.length - 1]) {
          pagLabels = [...paginationLabels.map((_, idx) => page + idx)];
        } else if (page < paginationLabels[0]) {
          pagLabels = [
            ...paginationLabels.map(
              (label) => label - PAGINATION_BUTTONS_LENGTH
            ),
          ];
        }

        setPagination({
          hasNextPage: res.data!.search.pageInfo.hasNextPage,
          hasPreviousPage: res.data!.search.pageInfo.hasPreviousPage,
          page,
          labels: pagLabels,
        });
        setPaginationLabels(pagLabels);
        setStartCursor(res.data!.search.pageInfo.startCursor);
        setEndCursor(res.data!.search.pageInfo.endCursor);
      })
      .catch((err) => console.log({ err }))
      .finally(() => setPageLoading(false));
  }

  return (
    <div className="bg-slate-50 w-full  py-8 flex flex-col justify-center items-center">
      <h1 className="w-full text-center text-3xl mb-8 p-0">
        Popular Repositories
      </h1>
      <div className="flex flex-col items-center justify-center w-full max-w-4xl">
        <Search handleSearch={handleSearch} />
        {pageLoading ? (
          <div className="flex flex-col justify-center items-center gap-4 mt-8">
            <SpinnerIcon />
            <p className="text-xl">Loading...</p>
          </div>
        ) : (
          <div className="flex flex-col w-full items-center gap-4">
            {repositories.length > 0 ? (
              <>
                <TableList repositoriesList={repositories} />
                {pagination && (
                  <Pagination
                    {...pagination}
                    handlePageClick={handlePageClick}
                  />
                )}
              </>
            ) : (
              <div>No results found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
