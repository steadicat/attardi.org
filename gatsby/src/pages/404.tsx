import * as React from 'react';
import {View} from 'glamor/jsxstyle';
import {Title, Subtitle, Button} from '../components/text';
import {unit} from '../design/layout';
import Layout from '../components/Layout';

interface NotFoundPageProps {
  location: {pathname: string}
}

const NotFoundPage = ({location}: NotFoundPageProps) => (
  <Layout location={location}>
    <View
      textAlign="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="80vh">
      <Title>Not Found</Title>
      <Subtitle marginTop={unit / 2} marginBottom={unit * 2}>
        There’s nothing here.
      </Subtitle>
      <Button to="/">Back Home</Button>
    </View>
  </Layout>
);

export default NotFoundPage;
