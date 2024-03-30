/** hooks 执行的策略 */
export var ScheduleTypeEnum;
(function (ScheduleTypeEnum) {
    /** pipeline串行执行：所有async任务完成后再执行回调 */
    ScheduleTypeEnum["ASYNC_SRRIES"] = "ASYNC_SRRIES";
    /** async并行执行：等待Promise.all所有async任务后再执行回调 */
    ScheduleTypeEnum["ASYNC_PARALLEL"] = "ASYNC_PARALLEL";
})(ScheduleTypeEnum || (ScheduleTypeEnum = {}));
//# sourceMappingURL=interface.js.map