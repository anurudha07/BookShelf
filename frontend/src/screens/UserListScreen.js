// File: src/screens/UserListScreen.js
import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../actions/userActions";
import Loader from "../component/Loader";
import Message from "../component/Message";  // Assuming you have a Message component

export default function UserListScreen({ history }) {
  const dispatch = useDispatch();

  // Grab user list state
  const { loading, error, users: usersArray } = useSelector(
    (state) => state.userList
  );

  // Grab login info
  const { userInfo } = useSelector((state) => state.userLogin);

  // Grab delete state
  const { success: successDelete, error: errorDelete, loading: loadingDelete } =
    useSelector((state) => state.userDelete);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    } else {
      dispatch(listUsers());
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <Container className="mt-5 p-5">
      <h2>Users</h2>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!Array.isArray(usersArray) || usersArray.length === 0 ? (
              <tr>
                <td colSpan="5">No users found.</td>
              </tr>
            ) : (
              usersArray.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i className="fas fa-check" style={{ color: "green" }} />
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteUserHandler(user._id)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
