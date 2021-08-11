import axios from 'axios';
import React, {useMemo} from 'react';
import {useContext} from 'react';
import {useState} from 'react';
import {createContext} from 'react';
import IPost from '../Models/IPosts';

interface PostContextProps {
  posts: IPost[];
  setPosts: (posts: IPost[]) => void;
  fetchPosts: () => Promise<void>;
}

const PostContext = createContext<PostContextProps>({
  posts: [],
  setPosts: () => {},
  fetchPosts: () => Promise.resolve(),
});

export const PostsProvider: React.FC = ({children}) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const fetchPosts = async () => {
    try {
      const publis = await axios.get(
        'https://jsonplaceholder.typicode.com/posts',
      );
      setPosts(publis.data);
    } catch (error) {
      console.error(error);
    }
  };

  const valor = useMemo(
    () => ({posts, setPosts, fetchPosts}),
    [posts, setPosts, fetchPosts],
  );

  return <PostContext.Provider value={valor}>{children}</PostContext.Provider>;
};

export const usePosts = () => useContext(PostContext);
