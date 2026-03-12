import { Button } from "./ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Search } from "lucide-react";

export const OverviewSerchbar = ({search, setSearch}: {search: string, setSearch: (search: string) => void}) => {
  return <InputGroup>
  <InputGroupAddon align="inline-end">
    <Button variant="outline" size="icon-xs">
      <Search />
    </Button>
  </InputGroupAddon>
  <InputGroupInput
    placeholder="Search by source or ID"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</InputGroup>
}
