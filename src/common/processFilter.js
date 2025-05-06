// Copyright (C) 2025, Stefan Kloppenborg
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.


import { referenceFields } from "../common/referenceFields"


export const correctCase = (value, cur_filter) => {
    if(cur_filter["caseSensitive"]) {
        return value;
    } else {
        if (Array.isArray(value)) {
            return value.map(f => f.toUpperCase());
        } else {
            return value.toUpperCase();
        }
    }
};

export const filterToStringList = (filter) => {
  let value = correctCase(filter["value"], filter);
  value = !filter["tokenize"] ? (Array.isArray(value) ? value : [value]) : (value.match(/\S+/g) || []);
  return value;
};

export const generateFieldFilterRE = (filter_list) => {
    const fieldRE = referenceFields.map(cur_field => {
        const matching_filters = filter_list.filter(flt => (flt.field === "" || flt.field === cur_field.field))
        const filter_string_lists = matching_filters.map(flt => {
            return filterToStringList(flt).join("|");
        });
        const non_empty_list = filter_string_lists.filter(
            s => s.length > 0 && s[0] !== ""
        );
        const filter_text = non_empty_list.join("|")
        return {
            field: cur_field.field,
            filter_re: filter_text.length === 0
                ? null
                : new RegExp("(" + filter_text + ")", "i")
        };
    });

    return fieldRE;
};

export const getFieldFilterRE = (fieldRE, field) => {
    const cur_filter = fieldRE.filter(flt => flt.field === field);
    const re = cur_filter.map(flt => flt.filter_re);
    return re.length > 0 ? re[0] : null;
};
