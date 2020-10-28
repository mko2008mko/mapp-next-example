import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd-mobile';
import { Text } from 'react-native-elements';

import { decrement, increment, incrementByAmount, incrementAsync, selectCount } from './slice';
import styles from './counter.module.less';

function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      <div>
        <Button type="primary" aria-label="Increment value" onClick={() => dispatch(increment())}>
          +
        </Button>
        <span className={styles.val}>{count}</span>
        <Text h2>{count}</Text>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          -
        </button>
      </div>
      <div>
        <input
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <Button onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}>
          Add Amount
        </Button>
        <Button onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}>
          Add Async
        </Button>
      </div>
    </div>
  );
}

export default Counter;
