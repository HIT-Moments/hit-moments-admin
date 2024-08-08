import musicApi from '@/apis/music.api';

import { useCallback, useState } from 'react';

const useMusicActions = () => {
  const [musics, setMusics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [message, setMessage] = useState('');

  const searchMusics = useCallback(async (keyword, limit = 10, page = 1) => {
    setIsLoading(true);
    try {
      const response = await musicApi.search({ keyword, limit, page });
      setMessage(response.data.message);
      setMusics(response.data.data.music);
      setTotalPage(response.data.data.totalPage);
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteMusic = async (musicId) => {
    setIsLoading(true);
    try {
      const response = await musicApi.delete(musicId);
      await searchMusics(' ', 10, 1);
      setMessage(response.data.message);
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return { musics, isLoading, totalPage, message, searchMusics, deleteMusic };
};

export default useMusicActions;
