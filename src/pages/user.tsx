import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUsers, usersSelector } from '../features/user';
import User from '../models/user';

const IndexPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const users: User[] = useAppSelector(usersSelector) || [];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <h1>Welcome to the greatest app in the world!</h1>
      <table>
        <thead>
          <tr>
            <th>123</th>
            <th>145</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((users: User, index: number) => (
              <tr>
                <td>{users.id}</td>
                <td>{users.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default IndexPage;
