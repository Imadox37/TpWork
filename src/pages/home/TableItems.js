import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Col, Row, ListGroup, Button } from 'react-bootstrap';

import { getPosts, setLoading } from '../../actions/postActions';
import { useTable } from 'react-table';
export default function TableItems() {
  const dispatch = useDispatch();
  const postsReducer = useSelector((state) => state.posts);
  const { loading, error, posts } = postsReducer;

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [filtred, setFiltred] = useState([]);
  const [userId, SetUserId] = useState('');
  const [postFiltred, setPostFiltred] = useState([]);
  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  useEffect(() => {}, [filtred]);

  const PostFiltred = () => {
    const seen = new Set();
    setPostFiltred(
      posts.filter((el) => {
        const duplicate = seen.has(el.userId);
        seen.add(el.userId);
        return !duplicate;
      })
    );
  };

  useEffect(() => {
    dispatch(getPosts());
    dispatch(setLoading());
  }, [dispatch]);

  useEffect(() => {
    defineTableColumns();
    // eslint-disable-next-line
  }, [posts]);

  useEffect(() => {
    PostFiltred();
    console.log('ff', userId);
  }, [posts]);

  const defineTableColumns = () => {
    let Columns = [];
    let Datas = [];

    if (error) {
      alert(error);
    }

    if (posts[0] !== undefined) {
      const itemKeys = Object.keys(posts[0]);

      itemKeys.forEach((key, index) => {
        Columns = [...Columns, { Header: key, accessor: key }];
      });

      posts.map((post) => {
        Datas = [...Datas, post];
        return Datas;
      });

      setData(Datas);
      setColumns(Columns);
    }
  };

  const renderData = () => {
    if (loading && !posts) {
      return <h3>Loading...</h3>;
    } else {
      return (
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th
                        {...column.getHeaderProps()}
                        style={{
                          borderBottom: 'solid 3px red',
                          background: 'aliceblue',
                          color: 'black',
                          fontWeight: 'bold',
                        }}
                      >
                        {
                          // Render the header
                          column.render('Header')
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td
                            {...cell.getCellProps()}
                            style={{
                              padding: '10px',
                              border: 'solid 1px gray',
                              background: 'papayawhip',
                            }}
                          >
                            {
                              // Render the cell contents
                              cell.render('Cell')
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      );
    }
  };

  const filterDataByUserId = (e) => {
    SetUserId(e.target.value);
    const datax = posts.filter((x) => x.userId == e.target.value);

    // setFiltred(datax)
    setData(datax);
    console.log(filtred, data);
  };

  return (
    <div>
      <h2>List of Posts</h2>

      <ListGroup.Item>
        <Row>
          <Col>User Id</Col>
          <Col>
            <Form.Control
              as='select'
              value={userId}
              onChange={filterDataByUserId}
            >
              {postFiltred.map((x) => (
                <option key={x.userId} value={x.userId}>
                  {x.userId}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Row>
      </ListGroup.Item>
      {console.log(userId)}

      {renderData()}
    </div>
  );
}
