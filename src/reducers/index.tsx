export function reducer(state: { id: string, isFirstTime?: boolean }, action: { type: string, id: string, isFirstTime?: boolean }) {
  switch (action.type) {
    case 'login': {
      return {
        id: action.id,
        isFirstTime: action.isFirstTime || state.isFirstTime
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}