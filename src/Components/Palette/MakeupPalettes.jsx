import React from 'react';
import './MakeupPalettes.css'

const MakeupPalettes = () => {
    return (
        <div style={{ overflow: 'hidden'}}>
            <h1>палетки</h1>

            <div className="main-content">

                <div className="palette__wrapper">
                    <div className="palette palette--one">
                        <div className="palette__cover">
                            <div className="palette__cover__border">
                                <span>Yellow Flicker Beat</span>
                            </div>
                        </div>
                        <div className="palette__cover__top"></div>
                        <div className="palette__base">
                            <div className="palette__shade"></div>
                            <div className="palette__shade"></div>
                            <div className="palette__shade"></div>
                            <div className="palette__shade"></div>
                            <div className="palette__shade"></div>
                        </div>
                        <h4>Yellow Flicker Beat<small>Lorde</small></h4>
                    </div>
                </div>

                <div className="palette__wrapper">
                    <div className="palette palette--two">
                        <div className="palette__cover">
                            <div className="palette__cover__border">
                                <span>Four Pink Walls</span>
                            </div>
                        </div>
                        <div className="palette__cover__top"></div>
                        <div className="palette__base">
                            <div className="palette__shade"></div>
                            <div className="palette__shade"></div>
                            <div className="palette__shade"></div>
                            <div className="palette__shade"></div>
                        </div>
                        <h4>Four Pink Walls<small>Alessia Cara</small></h4>
                    </div>
                </div>

                <div className="palette__wrapper">
                    <div className="palette palette--three">
                        <div className="palette__cover">
                            <div className="palette__cover__border">
                                <span>Blue on blue</span>
                            </div>
                        </div>
                        <div className="palette__cover__top"></div>
                        <div className="palette__base">
                            <div className="palette__shade"></div>
                            <div className="palette__shade"></div>
                            <div className="palette__shade"></div>
                            <div className="palette__shade"></div>
                            <div className="palette__shade"></div>
                            <div className="palette__shade"></div>
                            <div className="palette__shade"></div>
                            <div className="palette__shade"></div>
                        </div>
                        <h4>Blue on Blue<small>James Blunt</small></h4>
                    </div>
                </div>

                <div className="palette__wrapper">
                    <div className="palette palette--four">
                        <div className="palette__cover">
                            <div className="palette__cover__border">
                                <span>Little Black Dress</span>
                            </div>
                        </div>
                        <div className="palette__cover__top"></div>
                        <div className="palette__base">
                            <div className="palette__shade"></div>
                            <div className="palette__shade"></div>
                            <div className="palette__shade"></div>
                            <div className="palette__shade"></div>
                            <div className="palette__shade"></div>
                        </div>
                        <h4>Little Black Dress<small>Sara Bareilles</small></h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeupPalettes;