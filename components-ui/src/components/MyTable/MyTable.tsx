import { DragSortTable, ParamsType, ProTable, ProTableProps } from '@ant-design/pro-components';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Resizable } from 'react-resizable';
import "./MyTable.less";
import { Switch } from 'antd';

const ResizeableTitle = (props: any) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};


export type MyTableProps<T, U> = ProTableProps<T, U> & {
  columns: any[];
  // 是否开启排序
  sortable?: boolean;
  // 拖拽排序的字段
  dragSortKey?: string;
  // 拖拽排序的回调
  onDragSortEnd?: (beforeIndex: number, afterIndex: number, newDataSource: T[], rowKey?: any, ids?: any[]) => Promise<void> | void;
}


export const MyTable = forwardRef(<T extends Record<string, any>, U extends ParamsType>(props: MyTableProps<T, U>, ref: any) => {

  const sortable = props.sortable ? props.sortable : false;

  const [dataSource, setDataSource] = useState<T[]>([]);

  const [isSort, setIsSort] = useState<boolean>(false);

  const propsColumns = props.columns.map(item => {
    if (item.width === undefined) {
      item.width = 100;
    }
    return item;
  });

  const [columns, setColumns] = useState<any>(propsColumns);

  const handleResize = (index: number) => (e: any, { size }: any) => {
    const nextColumns = [...(columns ?? [])];
    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width,
    };
    setColumns(nextColumns);
  };

  const transformedColumns = (columns || []).map((col: any, index: number) => ({
    ...col,
    onHeaderCell: (column: any) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  const selfActions = () => {
    const list = [];
    if (props.toolBarRender) {
      // @ts-ignore
      list.push(props.toolBarRender());
    }
    if (sortable) {
      list.push(
        <div>
          <Switch
            checkedChildren="退出调序"
            unCheckedChildren="调整排序"
            defaultChecked={isSort}
            onChange={(value) => {
              setIsSort(value);
            }} />
        </div>
      );
    }

    return list;
  }


  // options 增加默认全屏按钮的支持
  let options: any;
  if (props.options) {
    options = Object.assign(props.options, { fullScreen: props.options.fullScreen === false ? false : true });
  } else {
    if (props.options === undefined) {
      options = { fullScreen: true };
    } else {
      options = false;
    }
  }


  const newProps = {
    ...props,
    columns: transformedColumns,
    toolbar: {
      ...props.toolbar,
      // 增加自定义排序按钮
      actions: selfActions(),
    },
    pagination: {
      // 增加默认的每页条数显示控制
      showSizeChanger: true,
      ...props.pagination,
    },

    options: options,
    dataSource: dataSource.length > 0 ? dataSource : undefined,
    onDragSortEnd: async (beforeIndex: number, afterIndex: number, newDataSource: T[]) => {
      // 当完成拖拽排序后，调用更新数据源，并在回调成功后，关闭拖拽排序
      if (props.onDragSortEnd) {
        if (props.rowKey === undefined) {
          await props.onDragSortEnd(beforeIndex, afterIndex, newDataSource);
        } else {
          //@ts-ignore
          const ids = newDataSource.map(val => val[props.rowKey]);
          await props.onDragSortEnd(beforeIndex, afterIndex, newDataSource, props.rowKey, ids);
        }
        setDataSource(newDataSource);
        setIsSort(false);
      }
    }
  }

  useEffect(() => {
    if (!isSort) {
      setDataSource([]);
    }
  }, [isSort]);

  if (isSort) {
    return <DragSortTable {...newProps} />;
  } else {
    return <ProTable components={{ header: { cell: ResizeableTitle } }}   {...newProps} />;
  }

});

