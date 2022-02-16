import { Typography, Paper } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding-top: 32px;
`;

const ProfilePaper = styled(Paper)`
  margin-left: 64px;
  margin-right: 64px;
  margin-top: 32px;
  padding-left: 64px;
  padding-right: 64px;
  padding-top: 32px;
  padding-bottom: 32px;

  @media only screen and (max-width: 400px) {
    margin-left: 0;
    margin-right: 0;
    padding-left: 32px;
    padding-right: 32px;
    height: calc(100vh - 56px - 64px); // viewHeight - headerHeight - padding
  }

  max-width: 900px;
  @media only screen and (min-width: 1028px) {
    // maxWidth + margins
    margin-left: calc((100vw - 900px) / 2);
    margin-right: calc((100vw - 900px) / 2);
  }
`;

const NameContainer = styled.div`
  display: flex;
`;

interface ProfileProps {
  user: UserRow;
}

const Profile = ({ user }: ProfileProps): React.ReactElement | null => {
  return (
    <Container>
      <ProfilePaper elevation={3}>
        <NameContainer>
          <Typography variant="body1" color="textSecondary">
            <strong>Name: </strong>
          </Typography>
          <Typography variant="body1" color="textSecondary">{user.name}</Typography>
        </NameContainer>
      </ProfilePaper>
    </Container>
  );
};

export default Profile;
