import { useEffect, useState, useRef } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

export function HandleAction() {
  const { handleActionCode } = useAuthContext();
  const actionType = new URLSearchParams(window.location.search).get('mode');
  const [handled, setHandled] = useState(false);
  const hasCalled = useRef(false);

  const fireHandleActionCall = async () => {
    if (!handled && !hasCalled.current) {
      hasCalled.current = true;
      if (await handleActionCode()) {
        setHandled(true);
      }
    }
  };

  useEffect(() => {
    fireHandleActionCall();
  }, []);

  return (
    <>
      {actionType === 'verifyEmail' && handled && (
        <div>
          <h1>Email verified!</h1>
          <p>You can now sign in.</p>
        </div>
      )}
    </>
  );
}
