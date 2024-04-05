import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import subCategoryService from "../../services/subCategoriesService";
import { useEffect, useState } from "react";
import SubCategoryCard from "../ui/subcategory-card";
import DashAdminSubCategoriesHeader from "../ui/dash-admin-subCategories__header";
import AddNewSubcategoryModal from "../ui/add.new-subCategory-modal";
import CategoriesModal from "../ui/categories-modal";

const DashAdminSubCategories = () => {
  const [subCategories, setSubCategories] = useState([]);

  //---------------------------
  const [isSubCategModalOpen, setIsSubCategModalOpen] = useState(false);

  const openSubCategModal = () => {
    setIsSubCategModalOpen(true);
  };

  const closeSubCategModal = () => {
    setIsSubCategModalOpen(false);
  };

  //---------------------------
  const [isCategModalOpen, setIsCategModalOpen] = useState(false);

  const openCategModal = () => {
    setIsCategModalOpen(true);
  };

  const closeCategModal = () => {
    setIsCategModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await subCategoryService.getAllSubCategories();
        setSubCategories(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des cours :", error);
      }
    };

    fetchData();
  }, [isSubCategModalOpen]);

  const handleDelete = (deletedSubCategoryId) => {
    // Update the subCategories list after deletion
    setSubCategories((prevSubCategories) =>
      prevSubCategories.filter(
        (subCategory) => subCategory._id !== deletedSubCategoryId
      )
    );
  };

  return (
    <DashLayout>
      <DashAdminSubCategoriesHeader isOpen={openCategModal} />
      <div className="addNewSubCateg-btn" onClick={openSubCategModal}>
        Add New Subcategory
      </div>
      <div className="dash__content__container__courses-list">
        {subCategories.map((item, index) => (
          <SubCategoryCard key={index} data={item} onDelete={handleDelete} />
        ))}
      </div>

      <AddNewSubcategoryModal
        isOpen={isSubCategModalOpen}
        onClose={closeSubCategModal}
      />

      <CategoriesModal isOpen={isCategModalOpen} onClose={closeCategModal} />
    </DashLayout>
  );
};

export default DashAdminSubCategories;
