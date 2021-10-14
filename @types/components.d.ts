declare module 'components' {

  namespace Props {
    interface ListItem<T> {
      value: T;
      editable?: boolean;
      onChange: onChangeHandler;
      onEdit: () => void;
      onDelete: () => void;
    }


  interface ListEditor {
    items: string[];
    onChange: (index: number, value: string) => void;
    onRemove: (index: number) => () => void;
    onAdd: () => void;
    className?: string;
    label: string;
    ListItem: ListItem;
  }

  }
}
