import * as types from '../constants/action-types'

const dataPending = (dataPendingMap, action) => {
    switch (action.type) {
        /**data pending, update connections amount*/
        case types.DATA_PENDING_START:
            console.log(dataPendingMap);
            return dataPendingMap.update('openedConnectionsAmount', val=>++val);
        case types.DATA_PENDING_FINISHED:
            console.log(dataPendingMap);
            return dataPendingMap.update('openedConnectionsAmount', val=>--val);

        /** default */
        default:
            return dataPendingMap;
    }
}

export default dataPending