export const checkAllCondition = (data: any[], listChecked: any[]) => {
  return (
    data?.length > 0 && data.every((item) => listChecked.includes(item.id))
  );
};
export const handleCheckAll = (
  data: any[],
  listChecked: any[],
  setListChecked: any
) => {
  if (checkAllCondition(data, listChecked)) {
    setListChecked([]);
  } else setListChecked([...data.map((item) => item.id)]);
};
