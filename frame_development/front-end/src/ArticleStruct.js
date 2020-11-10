import React, { useEffect, useState } from 'react';
import { Form, Input, Grid, Card } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';
import { TxButton } from './substrate-lib/components';

function Main (props) {
  const { api } = useSubstrate();
  const { accountPair } = props;

  // Transaction submission status
  const [status, setStatus] = useState('');

  // Currently stored values
  const [currentTitle, setCurrentTitle] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [formAuthor, setFormAuthor] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  const [formContent, setFormContent] = useState("");

  useEffect(() => {
    let unsubscribe;
    api.query.templateModule.article(newValue => {
      if(newValue.isNone) {
        setCurrentTitle('<None>');
        setCurrentAuthor('<None>');
        setCurrentContent('<None>');
      } else {
        console.log(newValue);
        setCurrentTitle(newValue.Title.toHuman());
        setCurrentAuthor(newValue.Author.toHuman());
        setCurrentContent(newValue.Content.toHuman());
      }
    }).then(unsub => {
      unsubscribe = unsub;
    }).catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api.query.templateModule]);

  return (
    <Grid.Column width={8}>
      <h1>Article Struct</h1>
      <Card centered>
        <Card.Content textAlign='center'>
          <Card.Header content={currentTitle} />
          <Card.Meta content={`Author: ${currentAuthor}`} />
          <Card.Description content={currentContent} />
        </Card.Content>
      </Card>
      <Form>
        <Form.Field>
          <Input
            label='Title'
            state='newValue'
            type='string'
            onChange={(_, { value }) => setFormTitle(value)}
          />
        </Form.Field>
        <Form.Field>
          <Input
            label='Author'
            state='newValue'
            type='string'
            onChange={(_, { value }) => setFormAuthor(value)}
          />
        </Form.Field>
        <Form.Field>
          <Input
            label='Content'
            state='newValue'
            type='string'
            onChange={(_, { value }) => setFormContent(value)}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <TxButton
            accountPair={accountPair}
            label='Save Article'
            type='SIGNED-TX'
            setStatus={setStatus}
            attrs={{
              palletRpc: 'templateModule',
              callable: 'updateArticle',
              inputParams: [{ "Title": formTitle, "Author": formAuthor, "Content": formContent }],
              paramFields: [true]
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  );
}

export default function ArticleStruct (props) {
  const { api } = useSubstrate();
  return (api.query.templateModule && api.query.templateModule.article
    ? <Main {...props} /> : null);
}