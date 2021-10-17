declare module 'components' {

  type OnChangeHandler<T> = (index: number, value: T) => void;
  namespace Props {
    interface ListItem<T> {
      value: T;
      editable?: boolean;
      onChange: (value: T) => void;
      onEdit: () => void;
      onDelete: () => void;
    }


    interface ListEditor<T, A extends ListItem> {
      items: T[];
      onChange: OnChangeHandler<T>;
      onRemove: (index: number) => () => void;
      onAdd: () => void;
      className?: string;
      label: string;
      ListItem: (props: ListItem<T> & Exclude<A<T>, keyof ListItem<T>>) => React.ReactElement | null;
      additionalProps?: Exclude<A<T>, keyof ListItem<T>>;
    }
  }
}
