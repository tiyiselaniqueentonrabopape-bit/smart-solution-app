import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllMessages = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/messages');
      setMessages(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMyMessages = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/messages/my');
      setMessages(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  }, []);

  const submitRequest = async (formData) => {
    try {
      const { data } = await axios.post('/api/messages', formData);
      setMessages(prev => [data, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to submit' };
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const { data } = await axios.put(`/api/messages/${id}/status`, { status });
      setMessages(prev => prev.map(m => m._id === id ? data : m));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message };
    }
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`/api/messages/${id}`);
      setMessages(prev => prev.filter(m => m._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message };
    }
  };

  const addNote = async (id, adminNote) => {
    try {
      const { data } = await axios.put(`/api/messages/${id}/note`, { adminNote });
      setMessages(prev => prev.map(m => m._id === id ? data : m));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message };
    }
  };

  return {
    messages, loading, error,
    fetchAllMessages, fetchMyMessages,
    submitRequest, updateStatus, deleteMessage, addNote
  };
};
