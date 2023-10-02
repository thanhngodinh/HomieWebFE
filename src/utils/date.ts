import dayjs from "dayjs"

export const formatShortDate = (date?: string | Date) =>{
    if(!date) return ""
    const dateClone = new Date(date)
    if(isNaN(dateClone as any) === true){
        return ""
    }
    return dayjs(dateClone).format('DD/MM/YYYY')
}