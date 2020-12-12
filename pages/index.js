import Head from 'next/head'
import React from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'

export default class Home extends React.Component {

    state = {
        rooms : []
    }

    updateState = () => {
        axios.get('http://localhost:3000/api/home/light-state').then(({data}) => {
            this.setState({rooms : data.cfg.rooms})
        }).catch()
    }

    interval = undefined

    componentDidMount() {
        this.updateState()
        this.interval = setInterval(()=>{
            this.updateState()
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    changeLightState = (i, flag) => {
        axios.post('http://localhost:3000/api/home/light-state/set-light-state', {i,flag}).then(({data}) => {
            this.setState({rooms : data})
        }).catch()
    }

    changeInputIntensity = (i, value) => {
        value = parseInt(value)
        axios.post('http://localhost:3000/api/home/light-state/set-light-intensity', {i,value}).then(({data}) => {
            this.setState({rooms : data})
        }).catch()
    }

    onMinTempIncrement = (i) => {
        const value = this.state.rooms[i].temperature.min + 1
        axios.post('http://localhost:3000/api/home/room-state/set-min-temperature', {i,value}).then(({data}) => {
            this.setState({rooms : data})
        }).catch()
    }

    onMinTempDecrement = (i) => {
        const value = this.state.rooms[i].temperature.min - 1
        axios.post('http://localhost:3000/api/home/room-state/set-min-temperature', {i,value}).then(({data}) => {
            this.setState({rooms : data})
        }).catch()
    }

    onMaxTempIncrement = (i) => {
        const value = this.state.rooms[i].temperature.max + 1
        axios.post('http://localhost:3000/api/home/room-state/set-max-temperature', {i,value}).then(({data}) => {
            this.setState({rooms : data})
        }).catch()
    }

    onMaxTempDecrement = (i) => {
        const value = this.state.rooms[i].temperature.max - 1
        axios.post('http://localhost:3000/api/home/room-state/set-max-temperature', {i,value}).then(({data}) => {
            this.setState({rooms : data})
        }).catch()
    }

    render = () => {
        return (
            <div className={styles.container}>
                <Head>
                    <title>{'Сервер домашней автоматизации'}</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <header>
                    <div className={styles.title}>
                        <span>{'Управление системой умного дома'}</span>
                    </div>
                </header>
                <main className={styles.roomWrapper}>
                    {this.state.rooms.map((el, i) => {
                        const {lightState, lightIntensity, title, temperature} = el
                        const {value, max, min} = temperature
                        return (
                            <div className={styles.room} key={i}>
                                <div className={styles.roomTitle}>
                                    <span>{title}</span>
                                </div>
                                <div className={styles.light}>
                                    <span>{'Свет'} {lightState ? 'включен': 'отключен'}</span>
                                </div>
                                <div className={styles.lightInput}>
                                    <div className={styles.lightInputBg}  onClick={()=>{this.changeLightState(i, lightState)}}>
                                        <div className={styles.lightInputFg} style={{marginLeft : lightState ? '30px' : '0px'}}/>
                                    </div>
                                </div>
                                <div className={styles.light}>
                                    <span>{'Яркость света'}</span>
                                </div>
                                <div className={styles.lightInputRange}>
                                    <input type="range" min={0} max={100} value={lightIntensity} onChange={({target}) => {this.changeInputIntensity(i, target.value)}}/>
                                    <span>{lightIntensity} %</span>
                                </div>
                                <div className={styles.temperature}>
                                    <div>
                                        <span>
                                            {'Температура :'}
                                        </span>
                                    </div>
                                    <div className={styles.temperatureValues}>
                                        <div className={styles.temperatureValue}>
                                            <span>{'Минимальная :'} {min}</span>
                                            <div className={styles.temperatureValueButtons}>
                                                <button onClick={()=>{this.onMinTempIncrement(i)}}>{'+'}</button>
                                                <button onClick={()=>{this.onMinTempDecrement(i)}}>{'-'}</button>
                                            </div>
                                        </div>
                                        <div className={styles.temperatureValue}>
                                            <span>{'Максимальная :'} {max}</span>
                                            <div className={styles.temperatureValueButtons}>
                                                <button onClick={()=>{this.onMaxTempIncrement(i)}}>{'+'}</button>
                                                <button onClick={()=>{this.onMaxTempDecrement(i)}}>{'-'}</button>
                                            </div>
                                        </div>
                                        <div>
                                            <span>{'Текущая :'} {value}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </main>
            </div>
        )
    }

}
