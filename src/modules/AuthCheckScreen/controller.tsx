export const authChecking = (token: boolean, navigation: any) => {
    const { navigate } = navigation
    token ? navigate('AppStack') : navigate('LoginStack')
}