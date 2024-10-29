"use client";
import React, { useEffect, useState } from 'react';
import { Typography, Button, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUserData, updateUserData } from '@/apis/userApi';
import { setUserData } from '@/store/userSlice';
import ProtectedRoute from '@/components/ProtectedRoute';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.userData);
  const [newUsername, setNewUsername] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchUserData();
        dispatch(setUserData(data));
        setUsername(data.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getData();
  }, [dispatch]);

  const handleUpdateUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateUserData({ userId: '1', username: newUsername });

      if (response) {
        dispatch(setUserData(response));
        setUpdateSuccess(true);
        setUpdateError('');
        setUsername(newUsername);
        setNewUsername('');
      }
    } catch (error) {
      console.error('Error updating username:', error);
      setUpdateSuccess(false);
      setUpdateError('Failed to update username');
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <Typography variant="h4">User Data</Typography>
        <Typography variant="body1">Username: {username}</Typography>

        {/* Form to update username */}
        <form onSubmit={handleUpdateUsername} style={{ marginTop: '20px' }}>
          <TextField
            label="New Username"
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Update Username
          </Button>
        </form>

        {/* Display feedback messages */}
        {updateSuccess && <Typography variant="body1" style={{ color: 'green', marginTop: '10px' }}>Username updated successfully!</Typography>}
        {updateError && <Typography variant="body1" style={{ color: 'red', marginTop: '10px' }}>{updateError}</Typography>}
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;
