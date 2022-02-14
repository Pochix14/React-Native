import styled from '@emotion/native';
import React from 'react';
import {View, Text} from 'react-native';
import IPost from '../../../Models/IPosts';

export interface PostListItemProps {
  post: IPost;
}

const PostListItem: React.FC<PostListItemProps> = ({post}) => {
  return (
    <ItemContainer>
      <TextStyle>
        {post.id}. {post.title}
      </TextStyle>
    </ItemContainer>
  );
};

const ItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ebecf0;
  border-radius: 32px;
  padding: 8px 12px;
  margin: 4px 0;
`;

const TextStyle = styled.Text`
  text-transform: capitalize;
  width: 85%;
`;

export default PostListItem;
