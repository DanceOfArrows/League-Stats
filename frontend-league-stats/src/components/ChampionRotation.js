import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getChampionRotation } from '../redux/championRotation';

const ChampionRotation = (props) => {
    const { championRotation, getChampionRotation } = props;

    useEffect(() => {
        if (!championRotation) getChampionRotation();
    }, [championRotation, getChampionRotation]);

    console.log(championRotation)

    return (
        <>
            <div className='league-stats-test-long-div'>

            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        championRotation: state.championRotation.championRotation,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getChampionRotation: () => dispatch(getChampionRotation()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    ChampionRotation
);