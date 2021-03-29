import React from 'react';

const SearchBox = (props) => {
    console.log('test');
    return (
        <div className="mx-auto">
            <div>This is Search box</div>
            <form>
                <input />
                <span className="fa fa-search" />
            </form>
        </div>
    );
};

export default SearchBox;
