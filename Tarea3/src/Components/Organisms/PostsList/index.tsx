import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import {usePosts} from '../../../Context/posts-context';
import PostListItem from '../../Molecules/PostListItem';

const PostsList: React.FC = () => {
  const {posts, fetchPosts} = usePosts();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={({item}) => <PostListItem post={item} />}
        />
      ) : (
        <ActivityIndicator color="#000" />
      )}
    </View>
  );
};

export default PostsList;
