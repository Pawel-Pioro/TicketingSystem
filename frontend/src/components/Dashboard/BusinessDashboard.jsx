import Plot from 'react-plotly.js'
import { useState, useEffect, useContext } from 'react'
import { APIContext } from '../../context/APIContext'

export default function BusinessDashboard() {
    const { client } = useContext(APIContext)

    const [graphData, setGraphData] = useState({
        "dates": [],
        "counts": [],
        "retrieved": false
    })

    useEffect(() => {
        client.get('graphs/').then((response) => {
            setGraphData({
                "dates": response.data.dates,
                "counts": response.data.counts,
                "retrieved": true
            })
        })
    }, [])

    return (
        <div className="grid place-items-center">
            <p className="text-4xl  font-bold my-7">Dashboard</p>
            {graphData.retrieved
                ? <div className="w-full h-96 md:h-150 mt-4">
                    <Plot
                        data={[
                            {
                                x: graphData.counts,
                                y: graphData.dates,
                                type: 'bar',
                            },
                        ]}
                        layout={{
                            title: {
                                text: 'Tickets per day',
                                font: {
                                    color: 'white',
                                    size: 25,
                                    weight: 'bold'
                                }
                            },
                            xaxis: {
                                title: 'Date',
                            },
                            yaxis: {
                                title: 'Count',
                            },
                            plot_bgcolor: '#000000ff',
                            paper_bgcolor: '#000000ff',
                            font: {
                                color: 'white'
                            }
                        }}
                        useResizeHandler={true}
                        onAutoSize={true}
                        config={{ responsive: true }}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
                : <p>Loading...</p>
            }
        </div>
    )
}
