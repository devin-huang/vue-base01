export const listPoPermission = () => {
  return {
    code: '200',
    message: 'Successful operation',
    data: [
      'api:operations', // 有权限操作
      'api:edit', // 有权限编辑内容
      'api:view' // 有权限显示内容
    ]
  }
}
