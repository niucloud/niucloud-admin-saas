import { jsonp } from 'vue-jsonp'

const geometry: any = {}

/**
 * 在地图上创建一个圆形
 */
export const createCircle = (map: any, geometriesData: any) => {
    const TMap = (window as any).TMap
    const LatLng = TMap.LatLng

    geometriesData.radius = geometriesData.radius ?? 1000
    geometriesData.center = geometriesData.center ?? { lat: map.getCenter().lat, lng: map.getCenter().lng }

    const color = [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
    ]

    // 创建图形
    const multiCircle = new TMap.MultiCircle({
        map,
        styles: { // 设置圆形样式
            circle: new TMap.CircleStyle({
                color: `rgba(${color.toString()}, .4)`,
                showBorder: true,
                borderColor: `rgb(${color.toString()})`,
                borderWidth: 2
            })
        },
        geometries: [
            {
                styleId: 'circle',
                center: new LatLng(geometriesData.center.lat, geometriesData.center.lng),
                radius: parseInt(geometriesData.radius),
                id: geometriesData.key
            }
        ]
    })
    geometry[geometriesData.key] = { graphical: multiCircle }

    // 创建图形编辑器
    const editor = new TMap.tools.GeometryEditor({
        map: map,
        overlayList: [
            {
                overlay: multiCircle,
                id: geometriesData.key,
            }
        ],
        actionMode: TMap.tools.constants.EDITOR_ACTION.INTERACT,
        activeOverlayId: geometriesData.key, // 激活图层
        selectable: true // 开启点选功能
    })

    editor.on('adjust_complete', (data: any) => {
        geometriesData.center = { lat: data.center.lat, lng: data.center.lng }
        geometriesData.radius = parseInt(data.radius)
    })

    geometry[geometriesData.key] = { graphical: multiCircle, editor }
}

/**
 * 在地图上创建一个多边形
 * @param map
 * @param geometriesData
 */
export const createPolygon = (map: any, geometriesData: any) => {
    const TMap = (window as any).TMap
    const LatLng = TMap.LatLng

    const { lat, lng } = map.getCenter();

    geometriesData.paths = geometriesData.paths ?? [
        { lat: lat + 0.01, lng: lng + 0.01 },
        { lat: lat - 0.01, lng: lng + 0.01 },
        { lat: lat - 0.01, lng: lng - 0.01 },
        { lat: lat + 0.01, lng: lng - 0.01 }
    ]

    const color = [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
    ]

    const multiPolygon = new TMap.MultiPolygon({
        map: map,
        styles: {
            polygon: new TMap.PolygonStyle({
                color: `rgba(${color.toString()}, .4)`,
                showBorder: true,
                borderColor: `rgb(${color.toString()})`,
                borderWidth: 2
            })
        },
        geometries: [
            {
                id: geometriesData.key,
                styleId: 'polygon',
                paths: geometriesData.paths.map((item: any) => {
                    return new LatLng(item.lat, item.lng)
                })
            }
        ]
    });

    const editor = new TMap.tools.GeometryEditor({
        map: map,
        overlayList: [
            {
                overlay: multiPolygon,
                id: geometriesData.key,
            }
        ],
        actionMode: TMap.tools.constants.EDITOR_ACTION.INTERACT,
        activeOverlayId: geometriesData.key, // 激活图层
        selectable: true, // 开启点选功能
    })

    editor.on('adjust_complete', (data: any) => {
        geometriesData.paths = data.paths.map(item => {
            return { lat: item.lat, lng: item.lng}
        })
    })

    geometry[geometriesData.key] = { graphical: multiPolygon, editor }
}

/**
 * 删除图形
 * @param key
 */
export const deleteGeometry = (key: string) => {
    geometry[key].graphical.remove(key)
    geometry[key].editor.delete()
}

/**
 * 选中图形
 * @param key
 */
export const selectGeometry = (key: string) => {
    geometry[key].editor.select([key])
}

/**
 * 创建点标记
 * @param map
 * @returns
 */
export const createMarker = (map: any) => {
    const TMap = (window as any).TMap
    const LatLng = TMap.LatLng

    return new TMap.MultiMarker({
        map,
        geometries: [
            {
                id: 'center',
                position: map.getCenter(),
            }
        ]
    });
}

/**
 * 逆地址解析
 * @param params
 */
export const latLngToAddress = (params: any) => {
    return jsonp(`https://apis.map.qq.com/ws/geocoder/v1/?key=${params.mapKey}&location=${params.lat},${params.lng}&output=jsonp&callback=callback`)
}

/**
 * 地址解析
 */
export const addressToLatLng = (params: any) => {
    return jsonp(`https://apis.map.qq.com/ws/geocoder/v1/?key=${params.mapKey}&address=${params.address}&output=jsonp&callback=callback`)
}
