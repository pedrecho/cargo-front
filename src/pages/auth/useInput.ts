import * as React from 'react'

export function useInput(){

    const [value, setValue] = React.useState('')

    const onChangeHandler = (e: any) => {
        setValue(e.target.value)
    }

    return{
        value,
        onChange: onChangeHandler,
    }

}