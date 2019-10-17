import { useState } from 'react';

export function useLocalState(localItem) {
    const [local, setState] = useState(localStorage.getItem(localItem));

    function setLocal(newItem){
        localStorage.setItem(localItem, newItem);
        setState(newItem);
    }
    return[local, setLocal];
}

export default useLocalState;