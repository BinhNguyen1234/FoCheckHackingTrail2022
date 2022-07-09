Page({
  onScan(e) {
    my.scan({
      success: (res) => {
        const content = res.toString()
        console.log(res,content)
        my.alert({
          title: 'Found',
          content: res
        })
      },
      fail: (e) => {
        console.log(e);
      }
    });
  }
});