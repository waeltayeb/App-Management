import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid';

export default function Index({ auth, projects, queryParams = null, success }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("project.index"), queryParams);
    };
    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("project.index"), queryParams);
    };

    const deleteProject = (project) => {
        if (!window.confirm("Are you sure you want to delete the project?")) {
            return;
        }
        router.delete(route("project.destroy", project.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Projects
                </h2>
                <Link
                    href={route("project.create")}
                    className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                >
                    Add new
                </Link>
            </div>
            }  >


            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className=" text-xs text-gray-700 dark:text-gray-400 border-b-2 border-gray-500 ">
                                    <tr className="text-nowrap">
                                        <th
                                            onClick={(e) => sortChanged("id")}
                                            name="id"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer"  >
                                                ID
                                                <div>
                                                    <ChevronUpIcon className="w-4" />
                                                    <ChevronDownIcon className="w-4 -mt-2" />
                                                </div>
                                            </div>

                                        </th>
                                        <th className="px-3 py-3">Image</th>
                                        <th
                                            onClick={(e) => sortChanged("name")}
                                            name="name"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer"  >
                                                name
                                                <div>
                                                    <ChevronUpIcon className="w-4" />
                                                    <ChevronDownIcon className="w-4 -mt-2" />
                                                </div>
                                            </div>
                                        </th>

                                        <th
                                            onClick={(e) => sortChanged("status")}
                                            name="status"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer"
                                            >
                                                Status
                                                <div>
                                                    <ChevronUpIcon className="w-4" />
                                                    <ChevronDownIcon className="w-4 -mt-2" />
                                                </div>
                                            </div>

                                        </th>

                                        <th
                                            onClick={(e) => sortChanged("created_at")}
                                            name="created_at"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >

                                            <div className="px-3 py-3 flex items-center justify-between gap-1  cursor-pointer"  >
                                                Create Date
                                                <div>
                                                    <ChevronUpIcon className="w-4" />
                                                    <ChevronDownIcon className="w-4 -mt-2" />
                                                </div>
                                            </div>
                                        </th>

                                        <th
                                            onClick={(e) => sortChanged("due_date")}
                                            name="due_date"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer"  >
                                                due date
                                                <div>
                                                    <ChevronUpIcon className="w-4" />
                                                    <ChevronDownIcon className="w-4 -mt-2" />
                                                </div>
                                            </div>
                                        </th>
                                        <th className="px-3 py-3">Created By</th>
                                        <th className="px-3 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <thead className=" text-xs text-gray-700 dark:text-gray-400 border-b-2 border-gray-500 ">
                                    <tr className=" text-nowrap">
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2">
                                            <TextInput className="w-full"
                                                defaultValue={queryParams.name}
                                                placeholder="Project Name"
                                                onBlur={(e) =>
                                                    searchFieldChanged("name", e.target.value)
                                                } onKeyPress={(e) => onKeyPress("name", e)} />
                                        </th>
                                        <th className="px-3 py-2">
                                            <SelectInput className="w-full"
                                                defaultValue={queryParams.status}
                                                onChange={(e) =>
                                                    searchFieldChanged("status", e.target.value)
                                                } >
                                                <option value="">select statu</option>
                                                <option value="pending">pending</option>
                                                <option value="completed">completed</option>
                                                <option value="in_progress">in progress</option>

                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-2"> </th>
                                        <th className="px-3 py-2"> </th>
                                        <th className="px-3 py-2"> </th>
                                        <th className="px-3 py-2"></th>

                                    </tr>
                                </thead>
                                <tbody >
                                    {projects.data.map(project => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={project.id}>
                                            <td className="px-3 py-2">{project.id}</td>
                                            <td className="px-3 py-2"><img src={project.image_path} style={{ width: 60 }} /></td>
                                            <td className="px-3 py-2 text-gray-100 text-nowrap hover:underline ">
                                                <Link href={route("project.show", project.id)} >
                                                    {project.name}
                                                </Link></td>
                                            <td className="px-3 py-2">
                                                <span
                                                    className={
                                                        "px-3 py-2 rounded text-white " +
                                                        PROJECT_STATUS_CLASS_MAP[project.status]
                                                    }
                                                >
                                                    {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                </span>
                                            </td>

                                            <td className="px-3 py-2">{project.created_at}</td>
                                            <td className="px-3 py-2">{project.due_date}</td>
                                            <td className="px-3 py-2">{project.createdBy.name}</td>
                                            <td className="px-3 py-2">
                                                <Link href={route('project.edit', project.id)} className="text-blue-500 hover:text-blue-700 mr-2">Edit</Link>
                                                <button
                                                    onClick={(e) => deleteProject(project)}
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                >
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}