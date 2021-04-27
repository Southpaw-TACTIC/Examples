import React from 'react'
import { useState } from "react";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { get_ticket, call_tactic, get_server, get_server_url } from "./Server";

import './AssetList.css';

class AssetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: [],
            search_text: "",
        }
    }

    load = async () => {
        //this.get_asset_info();
    }

    get_asset_info = async () => {
        let search_text = this.state.search_text
        let search_type = "workflow/asset"
        let filters = [
            ['keywords', 'contains', search_text]
        ]
        let kwargs = {
            search_type: search_type,
            filters: filters,
        };
        let ticket = await get_ticket()
        let sobjects = await call_tactic("query", kwargs)

        //nothing found
        if (sobjects.length <= 0) {
            this.setState({assets: []})
            return;
        }

        const asset_codes = sobjects.map(element => element.code);
        console.log(asset_codes); // [1, 2, 3]
        let asset_codes_str = asset_codes.join("|")
        console.log(asset_codes_str)

        let asset_codes_filter = [
            ['search_code', 'in', asset_codes_str], ['is_latest', 'true']
        ]

        kwargs = {
            include_paths_dict: true,
            include_web_paths_dict: true,
            filters: asset_codes_filter,
            order_bys: "search_code",
        }

        ticket = await get_ticket()
        let snapshots = await call_tactic("query_snapshots", kwargs)
        console.log(snapshots)

        let res = sobjects.map(function(o, i) {
            return {
            code: o.code,
            name: o.name,
            status: o.status,
            snapshot: snapshots[i].__web_paths_dict__
            }
        })
        console.log(res)

        this.setState({assets: res})
        return;
    }

    get_asset_info_1 = async () => {
        let server = await get_server();
        let search_text = this.state.search_text

        let cmd = "spt.modules.workflow.SearchAssetCmd";
        let kwargs = {
            keywords: search_text
        }
        let ret_val = server.execute_cmd(cmd, kwargs)
        let info = ret_val.info;

        if (typeof info == 'undefined') {
          return;
        }
        let assets = info.sobjects;
        this.setState({assets: assets})
        return;
    }

    componentDidMount() {
        this.load()
    }

    handleInputChange = (event) => {
        this.setState({search_text: event.target.value })
    }

    render() {
        return (
            <div class="asset">
                <div class="searchForm">
                    <input type="text" id="filter" placeholder="Search for..." onChange={this.handleInputChange}/>
                    <button onClick={e => this.get_asset_info()}>Search</button>
                </div>
                <div class="asset-list">
                    {
                        this.state.assets.map( (asset, index) => (
                            <div key="{asset.code}" class="card item">
                                <div class="card-body">
                                    <h3 class="card-title">{asset.name}</h3>
                                    <div>
                                        <div>
                                            Asset Code: {asset.code} <br/>
                                            Name: {asset.name} <br/>
                                            Status: {asset.status} <br/>
                                        </div>
                                        <div>
                                            File:<br/>
                                            <div class="asset-icon">
                                                <a href={get_server_url() + asset.snapshot.main[0]} target="_blank">
                                                    <img src={get_server_url() + asset.snapshot.web[0]}/>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
  }

export default AssetList;
