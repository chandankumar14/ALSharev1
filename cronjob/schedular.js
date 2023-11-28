const cron = require('node-cron');
//***********this is schedular to excute the cron job to update event balance******** */
module.exports = {
    ingintConfig: (config) => {
        Object.keys(config).forEach(key => {
            if (cron.validate(config[key].frequency)) {
                cron.schedule(config[key].frequency, async () => {
                    let data = await config[key].handler();
                    if (data && data != undefined) {
                        console.log("cron job completed successfully")
                    } else {
                        console.log("somthing going wrong please check...")
                    }
                })
            }
        })
    }
}