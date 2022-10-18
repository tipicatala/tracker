export function reducer(state: { id: string }, action: { type: string, id: string }) {
  switch (action.type) {
    case 'login': {
      return {
        id: action.id,
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}