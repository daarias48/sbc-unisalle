const admin = require('./databaseDani')
const XLXS = require('xlsx')

controller = {}

const db = admin.database()

controller.exportData = (req, res) => {
    const data = req.body
    const workSheet = XLXS.utils.json_to_sheet(data)
    const workBook = XLXS.utils.book_new()

    XLXS.utils.book_append_sheet(workBook, workSheet, "mediciones")
    XLXS.write(workBook, { bookType: 'xlsx', type: "buffer" })
    XLXS.write(workBook, { bookType: "xlsx", type: "binary" })
    XLXS.writeFile(workBook, "mediciones.xlsx")
    return res.status(200)
}

module.exports = controller
