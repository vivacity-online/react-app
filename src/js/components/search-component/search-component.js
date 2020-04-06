import React, { useState, useEffect } from 'react';
import { Container, TextField, Button } from '@material-ui/core';
import { search } from '../../utils/search';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        auth_token: state.user.auth_token
    }
}

function SearchComponent(props) {
    const [searchData, setSearchData] = useState("");
    const [field, setField] = useState("")
    const [searchURL, setSearchURL] = useState("");

    let searchTerms = (terms) => terms.replace(/\s/g, '_');
    const url = (terms) => `${searchURL}?search_terms=${searchTerms(terms)}&${field + '=true' || ''}`;

    function handleSubmit(event) {
        event.preventDefault();
        search(url(searchData), props.auth_token)
        .then(data => {
            if(props.dataAction){
                props.dataAction(data);
            }
        })
    }
    function handleChange(event) {
        let val = event.target.value;
        setSearchData(val);
        search(url(val), props.auth_token)
        .then(data => {
            if(props.dataAction){
                if(data.length > 0){
                    props.dataAction(data);
                }else{
                    props.dataAction([])
                }
            }
        })
    }

    useEffect(() => {
        if(props.url) {
            setSearchURL(props.url)
        }
    }, [props.url, ]);
    useEffect(() => {
        if(props.searchField) {
            setField(props.searchField)
        }
    }, [props.searchField, ]);

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <TextField 
                    value={searchData} 
                    onChange={handleChange}
                    placeholder={"Search " + (field || "Vivacity")} 
                    />
                <Button type={"submit"}>Go</Button>
            </form>
        </Container>
    )
}

const Search = connect(mapStateToProps)(SearchComponent);
export default Search;