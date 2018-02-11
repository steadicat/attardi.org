import * as React from 'react';
import {View} from 'glamor/jsxstyle';
import {Title, Subtitle, Button} from '../components/text';
import {unit} from '../design/layout';

interface IndexPageProps {}

const IndexPage = ({}: IndexPageProps) => (
  <View
    textAlign="center"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    height="80vh">
    <Title>Not Found</Title>
    <Subtitle marginTop={unit / 2} marginBottom={unit * 2}>
      There’s nothing here. Sad.
    </Subtitle>
    <Button to="/">Back Home</Button>
  </View>
);

export default IndexPage;
