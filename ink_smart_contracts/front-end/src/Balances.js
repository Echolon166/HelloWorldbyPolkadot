import React, { useEffect, useState } from 'react';
import { Table, Grid, Button } from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSubstrate } from './substrate-lib';
import EchContract, { defaultGasLimit } from './EchContract';

export default function Main (props) {
  const { api, keyring } = useSubstrate();
  const accounts = keyring.getPairs();
  const [balances, setBalances] = useState({});
  const echContract = EchContract(api);

  const updateBalances = async (addresses) => {
    const balancesMap = [];
    await Promise.all(addresses.map(async (address) => {
      balancesMap[address] = (await echContract.query.balanceOf(address, 0, defaultGasLimit, address)).output.toHuman();
    }));
    setBalances(balancesMap);
  };

  useEffect(() => {
    const addresses = keyring.getPairs().map(account => account.address);
    let unsubscribeAll = null;

    api.query.system.account
      .multi(addresses, balances => {
        updateBalances(addresses);
      }).then(unsub => {
        unsubscribeAll = unsub;
      }).catch(console.error);

    return () => unsubscribeAll && unsubscribeAll();
  }, [api, keyring, setBalances, updateBalances]);

  return (
    <Grid.Column>
      <h1>ECH Balances</h1>
      <Table celled striped size='small'>
        <Table.Body>{accounts.map(account =>
          <Table.Row key={account.address}>
            <Table.Cell width={3} textAlign='right'>{account.meta.name}</Table.Cell>
            <Table.Cell width={10}>
              <span style={{ display: 'inline-block', minWidth: '31em' }}>
                {account.address}
              </span>
              <CopyToClipboard text={account.address}>
                <Button
                  basic
                  circular
                  compact
                  size='mini'
                  color='blue'
                  icon='copy outline'
                />
              </CopyToClipboard>
            </Table.Cell>
            <Table.Cell width={3}>{
              balances && balances[account.address] &&
              balances[account.address] + ' ECH'
            }</Table.Cell>
          </Table.Row>
        )}
        </Table.Body>
      </Table>
    </Grid.Column>
  );
}
